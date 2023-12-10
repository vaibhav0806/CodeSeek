import { Card, CardHeader, CardBody } from "@nextui-org/react";

const Instructions = () => {
    return (
        <Card style={{ width: '500px', minHeight: '200px' }}>
            <CardHeader className="flex justify-center">
                <div style={{ fontSize: 'x-Large' }} >
                    <b>
                        Instructions
                    </b>
                </div>
            </CardHeader>
            <CardBody>
                <p>
                    1. Enter your Query in the above search bar.
                </p>
                <p>
                    2. Click on the Search Icon to search the query.
                </p>
                <p>
                    3. Please keep in mind! Clicking on Enter wont search the query.
                </p>
            </CardBody>
        </Card>
    )
}

export default Instructions