import { Card, CardHeader, CardBody } from "@nextui-org/react";

const Instructions = () => {
    return (
        <Card style={{ width: '650px', minHeight: '200px', padding: "5rem"}}>
            <CardHeader className="flex justify-center">
                <div style={{ fontSize: 'x-Large' }} >
                    <b>
                        Instructions
                    </b>
                </div>
            </CardHeader>
            <CardBody className="flex justify-center">
                <ol>
                    <li>
                        1. Enter your Query in the above search bar.
                    </li>
                    <li>
                        2. Click on the Search Icon to search the query.
                    </li>
                    <li>
                        3. Please keep in mind! Clicking on Enter wont search the query.
                    </li>
                </ol>
            </CardBody>
        </Card>
    )
}

export default Instructions