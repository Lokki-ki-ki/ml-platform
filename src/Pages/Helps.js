import { Descriptions, Link, Input, Notification, Divider } from '@arco-design/web-react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setPlatformAddress } from '../Features/contractsSlice';
import { clearContractAddress } from '../Features/contractsSlice';

const data = [
    {
        label: 'Name',
        value: 'Lokki',
    },
    {
        label: 'LinkedIn',
        value: <Link href='https://www.linkedin.com/in/lokki-xu-0b1b3b1b9/'>https://www.linkedin.com/in/lokki-xu-0b1b3b1b9/</Link>,
    },
    {
        label: 'Residence',
        value: 'Singapore',
    },
    {
        label: 'Email',
        value: 'XULokki@outlook.com',
    },
    {
        label: 'About me',
        value: 'Fake it until you make it.',
    },
];

const Helps = () => {
    const [platformAdd, setPlatformAdd] = useState('');
    const dispatch = useDispatch();
    const updatePlatformAdd = () => {
        dispatch(setPlatformAddress(platformAdd));
        dispatch(clearContractAddress());
        Notification.success({
            style: { position: 'topRight' },
            id: 'updatePlatformAdd',
            title: 'Platform Address Updated',
            content: 'The platform address has been updated successfully.',
        });
    }

    return (
        <div>
            <h1>Additional Info</h1>
            <Descriptions column={1}
                data={data}
                style={{ margin: 20 }}
                labelStyle={{ paddingRight: 36 }} colon=' :' layout='inline-horizontal' />
            <Divider />
            <h1>For testing only</h1>
            <Input placeholder="In case I woule like to change platformAdd for testing" onChange={(e) => setPlatformAdd(e)} style={{ width: "30%", margin: 20 }}></Input>
            <Button onClick={updatePlatformAdd}>Change Platform Address</Button>
        </div>

    )
};

export default Helps;
