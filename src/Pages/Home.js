import React from 'react';
import { Button } from "@arco-design/web-react";
import ImagesBar from '../Components/ImagesBar';
import './Home.css'; // CSS file for styling the homepage

const Home = () => {

    return (
        <div className="home-container">
            <main>
            <section className="home-top">
                <div className="home-section-one">
                <h1>Utilize Machine Learning Platform supported by smart contract which will offer you a better way to gain what you want.</h1>
                <p>Deploy your own contract through the contract factory to enjoy your own possibility to gather high quality data without privacy issues.</p>
                <div className="home-buttons">
                    <Button type="secondary" className="home-button" href="/documentation"><span>Start the Contract</span></Button>
                    <Button type="secondary" className="home-button" href="/contracts"><span>Read the Documentation</span></Button>
                </div>
                </div>
            </section>

            <section className="home-middle">
                <ImagesBar />
                    {/* <img src={('/architecture.png')} alt='' style={{width:'50%', height:'50%', position:"center"}} />
                    <img src={('/architecture.png')} alt='' style={{width:'50%', height:'50%', position:"center"}} /> */}
                
                
            </section>
            </main>
            <footer>
            {/* Footer content here */}
            </footer>
        </div>
  );
};

export default Home;
