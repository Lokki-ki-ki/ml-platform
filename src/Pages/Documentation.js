import React from 'react';
import { Typography, Card, Link } from '@arco-design/web-react';
import "@arco-design/web-react/dist/css/arco.css";
const { Title, Paragraph, Text } = Typography;

const left = "{";
const right = "}";
const links = [
    {
        name: "Front-end",
        link: "https://github.com/Lokki-ki-ki/ml-platform"
    },
    {
        name: "Back-end",
        link: "https://github.com/Lokki-ki-ki/ml-platform-backend"
    },
    {
        name: "Contract",
        link: "https://github.com/Lokki-ki-ki/ml-platform-contract"
    },
    {
        name: "Oracle",
        link: "https://github.com/Lokki-ki-ki/ml-platform-oracle"
    }
]

const MyMarkdownComponent = () => {
    return (
        <Typography style={{ marginTop: 20, textAlign: 'left', padding: '3%'}}>
          <Title heading={1}>Documentation</Title>
          <Paragraph>
            The whole project is composed by four main components, each of which handles different features.
            The contract part is the core of the project, which is responsible for setting up the whole 
            system and decide the rules. The contract factory is the place where customized contracts are
            created. The user interface is the place where users can interact with the contract factory and
            the contract. The backend server is the place where the computation is done. And there is an off-chain
            oracle which is responsible for listening to the events emitted by the contract, and re-direct the
            request to the backend server.
          </Paragraph>
          <Paragraph>
            
            <Text bold>The github links can be found below:</Text>
            <ul>
                {links.map((item) => (
                    <li>
                        <Link icon href={item.link}>{item.name}: {item.link}</Link>
                    </li>
                ))}
            </ul>
          </Paragraph>
          <Title heading={2}>Deatiled Information</Title>
            <Card style={{ width: '80%' }}
                title='Evaluate the models from clients:'>
                <Text heading={6}>
                POST API: /api/evaluate-model
                </Text>
            
                <Text>
                <br/>Content-Type: application/json
                <br/>Request Body:
                <ul>
                    <li>modelAddress (string) - The address of the sample model, which is the cid of the file on IPFS.</li>
                    <li>testDataAddress (string) - The address of the test data file, which is the cid of the files on IPFS.</li>
                    <li>testLabelAddress (string) - The address of the test label file, which is the cid of the files on IPFS.</li>
                    <li>testDataHash (string) - The hash of the test data for consistency validation.</li>
                    <li>testLabelHash (string) - The hash of the label data for consistency validation.</li>
                    <li>clientsToSubmissions (dict) - clientId : weights submission address on IPFS</li>
                    <li>clientsToReputation (dict) - clientId : current reputation</li>
                </ul>
                </Text>
            </Card>
          <Paragraph style={{ "margin-top": "20px"}}>
            <Card style={{ width: '80%' }}
                    title='Evaluate the models from clients:'>
                    <Text heading={6}>
                    Get API: /api/evaluate-model
                    </Text>
                
                    <Text>
                    <br/>Content-Type: application/json
                    <br/>Request Body: Empty
                    </Text>

                    <Text>
                    <br/>Response:
                    <br/><Text code>200 : Model Evaluation is accepted, the evaluation results will be sent back.</Text>
                    <br/><Text code> {left}
                    <br/>"newModelAddress": "0x1234567890123456789012345678901234567890",
                    <br/>"clientIds": ["1", "2", "3"],
                    <br/>"clientNewReputations": [100, 100, 100],
                    <br/>"clientRewards": [80, 10, 10] {right}
                    </Text>
                    </Text>
                </Card>
          </Paragraph>
          <Paragraph>
            {/* <ol>
              <li>Architectural blueprints</li>
              <li>Engineering drawings</li>
              <li>Business processes</li>
            </ol> */}
          </Paragraph>
        </Typography>
      );
};

export default MyMarkdownComponent;

