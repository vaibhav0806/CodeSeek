import { useState, useMemo, useEffect } from 'react';
import './App.css';
import { Input, Spinner, Modal, ModalHeader, ModalContent, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
} from "@nextui-org/react";
import { useQuery } from 'react-query';
import { SearchIconJSX } from './components/SearchIconJSX';
import SearchIcon from '@mui/icons-material/Search';
import Stroke from './components/Stroke';

function fetchData(searchQuery) {
    const apiUrl = `http://localhost:3000/q?query=${searchQuery}`;
    return fetch(apiUrl).then((res) => res.json());
}

function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [queryEnabled, setQueryEnabled] = useState(false);
    const [forceFetch, setForceFetch] = useState(false);
    const [selectedItem, setSelectedItem] = useState({ item: null, title: "", body: "", answer: "" });


    const { data, isLoading, refetch } = useQuery(
        ['search', searchQuery],
        () => fetchData(searchQuery),
        {
            enabled: queryEnabled || forceFetch,
        }
    );

    console.log('API Response:', data);

    useEffect(() => {
        if (forceFetch) {
            refetch();
            setForceFetch(false);
        }
    }, [forceFetch, refetch]);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const searchResults = data?.RankedDocs || {};
    const resultsArray = Array.isArray(searchResults) ? searchResults : Object.values(searchResults);

    const rowsPerPage = 20;
    const [page, setPage] = useState(1);

    const pages = Math.ceil(resultsArray.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return resultsArray.slice(start, end);
    }, [page, resultsArray, rowsPerPage]);

    const handleClick = () => {
        console.log('Search query:', searchQuery);
        refetch();
    };

    const isQueryEntered = searchQuery.trim() !== '';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Stroke />
            <Input
                radius="lg"
                placeholder="Type your query and press enter"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                classNames={{
                    label: 'text-black/50 dark:text-white/90',
                    input: [
                        'bg-transparent',
                        'text-black/90 dark:text-white/90',
                        'placeholder:text-default-700/50 dark:placeholder:text-white/60',
                    ],
                    innerWrapper: 'bg-transparent',
                    inputWrapper: [
                        'shadow-xl',
                        'bg-default-200/50',
                        'dark:bg-default/60',
                        'backdrop-blur-xl',
                        'backdrop-saturate-200',
                        'hover:bg-default-200/70',
                        'dark:hover:bg-default/70',
                        'group-data-[focused=true]:bg-default-200/50',
                        'dark:group-data-[focused=true]:bg-default/60',
                        '!cursor-text',
                    ],
                }}
                endContent={
                    <SearchIcon color='primary' fontSize='large' onClick={handleClick} className='cursor-pointer' />
                }
            />
            {isLoading ? (
                <Spinner color="success" />
            ) : isQueryEntered ? (
                <>
                    <Table
                        aria-label="Example table with client-side pagination"
                        bottomContent={
                            <div className="flex w-full justify-center">
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="primary"
                                    page={page}
                                    total={pages}
                                    onChange={(page) => setPage(page)}
                                />
                            </div>
                        }
                        classNames={{
                            wrapper: 'min-h-[600px]',
                        }}
                    >
                        <TableHeader>
                            <TableColumn key="Rank" style={{ textAlign: 'left' }}>
                                Rank
                            </TableColumn>
                            <TableColumn key="Title" style={{ textAlign: 'left' }}>
                                Title
                            </TableColumn>
                            <TableColumn key="Action" style={{ textAlign: 'right' }}>
                                Action
                            </TableColumn>
                        </TableHeader>
                        <TableBody items={items}>
                            {(item, index) => (
                                <TableRow key={item.Title}>
                                    {(columnKey) => (
                                        <TableCell
                                            style={{
                                                textAlign: columnKey === 'Title' ? 'left' : 'right',
                                            }}
                                        >
                                            <>
                                                {columnKey === 'Title' ? (
                                                    item[columnKey]
                                                ) : (
                                                    <>
                                                        {item[columnKey]}{' '}
                                                        {columnKey === 'Action' && (
                                                            <Button
                                                                color="success"
                                                                variant="flat"
                                                                onPress={() => {
                                                                    setSelectedItem({
                                                                        item,
                                                                        title: item.Title,
                                                                        body: item.Body,
                                                                        answer: item.Answer,
                                                                    });
                                                                    onOpen();
                                                                }}
                                                            >
                                                                View
                                                            </Button>
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        </TableCell>
                                    )}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <Modal
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        size="5xl"
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    {/* Modal Header with enhanced styles */}
                                    <ModalHeader className="text-2xl font-bold text-primary bg-light-primary border-b">
                                        {selectedItem.title}
                                    </ModalHeader>
                                    <ModalBody className="bg-light-secondary">
                                        {/* Modal Body with enhanced styles */}
                                        <p className="text-lg text-default-900 mb-4">
                                            {selectedItem.body}
                                        </p>
                                        <p className="text-lg text-default-900">
                                            {selectedItem.answer}
                                        </p>
                                    </ModalBody>
                                    <ModalFooter>
                                        {/* Modal Footer with buttons */}
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button color="primary" onPress={onClose}>
                                            Action
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            ) : null}
        </div>
    );
}

export default App;