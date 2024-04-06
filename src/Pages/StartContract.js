import React from "react";
import UserInfo from "../Components/UserInfo";
import AllContracts from "../Components/AllContracts";
import SubmitContract from "../Components/SubmitContract"
import { Divider } from "@arco-design/web-react";
// import { Grid } from '@arco-design/web-react';
// const Row = Grid.Row;
// const Col = Grid.Col;


const StartContract = () => {
    return (
        <div>
            <h1>Start Contract</h1>
            <UserInfo />
            <AllContracts />
            <Divider />
            <SubmitContract />
        </div>
    );
}

export default StartContract;