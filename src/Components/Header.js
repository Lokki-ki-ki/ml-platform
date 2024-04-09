import React from 'react';
import Web3 from 'web3';
import { useEffect } from 'react';
import { IconRobot } from "@arco-design/web-react/icon";
import { Popover } from '@arco-design/web-react';
import { useSelector, useDispatch } from 'react-redux'
import { setLoginAccount, clearLoginAccount } from '../Features/loginAccountSlice';
import { clearContractAddress } from '../Features/contractsSlice';
import './Header.css'; // Ensure you have a Header.css file in the same directory
import { pre_require_check } from '../Utils/provider_utils';

const Header = () => {

  const accounts = useSelector((state) => state.loginAccount.accounts);
  const currentAccount = useSelector((state) => state.loginAccount.currentAccount);
  const dispatch = useDispatch();

  // useEffect to load the web3 object and listen for account changes
  useEffect(() => {
    if (!pre_require_check()) {
      console.log("check");
      return;
    }
    const loadAccounts = async () => {
      if (window.ethereum && window.ethereum.isConnected()) {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        dispatch(setLoginAccount({ accounts: accounts, currentAccount: accounts[0] }));
      } else {
        Notification.warning({
          style: { position: 'topRight' },
          id: 'error',
          title: 'Error',
          content: 'Please install MetaMask or use a browser that supports MetaMask',
        });
      }
    };

    loadAccounts();

    // Listen for account changes
    window.ethereum.on('accountsChanged', (accounts) => {
      dispatch(setLoginAccount({ accounts: accounts, currentAccount: accounts[0] }));
    });
    window.ethereum.on("chainChanged", (chainId) => window.location.reload()
    );

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', loadAccounts);
      }
    };
  }, [dispatch]);

  // Function to connect the wallet
  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      dispatch(setLoginAccount({ accounts: accounts, currentAccount: accounts[0] }));
    } catch (error) {
      console.error("Error connecting to MetaMask", error);
    }
  };

  const disconnectWallet = async () => {
    try {
      dispatch(clearLoginAccount());
      dispatch(clearContractAddress());
    } catch (error) {
      console.error("Error disconnecting MetaMask", error);
    }
  }

  const truncateAddress = (address) => {
    const len = address.length;
    return address.substring(0, 10) + '...' + address.substring(len - 5, len);
  }

  return (
    <header className="header">
      <div className="brand-logo">
        <IconRobot className='logo' />
        Machine Learning Platform
      </div>
      <nav className="navigation">
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/documentation">Documentation</a></li>
          <li><a href="/contracts">Contract Console</a></li>
          <li><a href="/helps">Helps</a></li>
        </ul>
      </nav>
      <div className="auth-links">
        {accounts.length > 0 ? (
          <div>
            <Popover trigger='hover'
              content={
                <span className='pop-up-text'>
                  <p>Your current account:</p>
                  <p>{truncateAddress(currentAccount)}</p>
                </span>
              }>
              <span onClick={disconnectWallet} type='text' className='auth-link'>Disconnect Wallet</span>
            </Popover>
            {/* <span className='auth-link'>{accounts[0]}</span> */}
          </div>
        ) : (
          <span onClick={connectWallet} type='text' className='auth-link'>Connect Wallet</span>
        )}
      </div>
    </header>
  );
};

export default Header;
