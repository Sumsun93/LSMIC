/**
 * Package import
 */
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Column, useTable, useGlobalFilter, useSortBy, useFilters } from 'react-table';
import { Table, Chips, InputField, Icon, Button, Tooltip, Dialog, Select, TextareaField } from '@oclock/crumble';

/**
 * Local import
 */
import { useSocket } from '../contexts/SocketProvider';
import { useAuth } from '../contexts/AuthProvider';
import { useBadges } from '../contexts/BadgesProvider';
import { useUsers } from '../contexts/UsersProvider';

// style
import * as S from './style';

interface DataModal {
    title: string,
    desc: string,
    cancelButton: {
        onClick: () => void,
        label: string,
    },
    successButton: {
        onClick: () => void,
        label: string,
    }
}

interface ModalState {
    context: string,
    row: any,
}

interface CreateBadgeState {
    open: boolean
    label: string,
    color: string,
}

interface RemoveBadgeState {
    userId: string,
    badgeId: string,
}

const Badges = () => {

}

const Badge = ({ badgeId, user }: { badgeId: string, user: any }) => {
    const badges = useBadges();
    const socket = useSocket();
    const auth = useAuth();

    const [hover, setHover] = useState(false);

    const badgeData = badges.findBadge(badgeId);

    const handleClickDelete = () => {
        if (auth.user.isAdmin) {
            socket.emit('updateOtherUser', {
                id: user.id,
                newData: {
                    badges: user.badges.filter((badge: string) => badge !== badgeId),
                }
            })
        }
    }

    if (badgeData) {
        return (
            <Tooltip content={badgeData.label} visible={hover}>
                <S.BadgeChips onClick={handleClickDelete} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} color={badgeData.color}>{auth.user.isAdmin && hover && <button><Icon name={"Times"} color="white" /></button>}</S.BadgeChips>
            </Tooltip>
        );
    }
    return null;
}

/**
 * Component
 */
const UsersTable = ({ data }: any) => {
    const auth = useAuth()
    const socket = useSocket();
    const badges = useBadges();
    const users = useUsers();

    const [modal, setModal] = useState<ModalState | null>(null);

    const [noteModal, setNoteModal] = useState<string | null>(null);
    const [noteInput, setNoteInput] = useState('');

    const [removeBadge, setRemoveBadge] = useState<RemoveBadgeState | null>(null);

    const [addBadge, setAddBadge] = useState<{ badgeId: string, userId: string } | null>(null);
    const [jobFilter, setJobFilter] = useState('all');
    const [availableFilter, setAvailableFilter] = useState('all');

    const tableData = useMemo(() => data, [data]);

    const handleAvailable = useCallback(
        () => {

        },
        [socket.socket],
    );

    const dataModal: Record<string, DataModal> = useMemo(() => ({
        available: {
            title: 'Changer la disponibilité',
            desc: 'Êtes-vous sûr de vouloir changer la disponibilité ?',
            cancelButton: {
                onClick: () => setModal(null),
                label: 'Annuler',
            },
            successButton: {
                onClick: () => {
                    console.log(socket.socket, modal);
                    socket.emit('availableOther', {
                        id: modal?.row.original.id,
                        state: !modal?.row.original.isAvailable,
                    });
                    setModal(null);
                },
                label: 'Confirmer',
            }
        },
        admin: {
            title: 'Changer le poste',
            desc: `Êtes-vous sûr de vouloir passer l'utilisateur en ${modal?.row.original.isAdmin ? 'intérimaire' : 'employé'} ?`,
            cancelButton: {
                onClick: () => setModal(null),
                label: 'Annuler',
            },
            successButton: {
                onClick: () => {
                    socket.emit('updateOtherUser', {
                        id: modal?.row.original.id,
                        newData: {
                            isAdmin: !modal?.row.original.isAdmin,
                        }
                    });
                    setModal(null);
                },
                label: 'Confirmer',
            }
        },
        delete: {
            title: 'Supprimer le compte',
            desc: 'Êtes-vous sûr de vouloir supprimer le compte ?',
            cancelButton: {
                onClick: () => setModal(null),
                label: 'Annuler',
            },
            successButton: {
                onClick: () => {
                    console.log(modal?.row.original);
                    socket.emit('deleteUser', {
                        _id: modal?.row.original.id,
                    });
                    setModal(null);
                },
                label: 'Supprimer',
            }
        }
    }), [socket.socket, modal]);


    const handleClickAction = (context: string, row: any) => () => {
        setModal({ context, row });
    }

    const handleCopy = (value: string) => (evt: any) => {
        evt.stopPropagation();
        navigator.clipboard.writeText(value);
    }

    const columns: Column<any>[] = useMemo(() => [
            {
                Header: 'Disponibilité',
                accessor: 'isAvailable',
                id: 'isAvailable',
                filter: (rows, ids, filterValue) => {
                    if (filterValue === 'available') {
                        return rows.filter((row) => row.values.isAvailable);
                    }
                    if (filterValue === 'notAvailable') {
                        return rows.filter((row) => !row.values.isAvailable);
                    }
                    return rows
                },
                width: 20,
                Cell: ({ row }) => row.original.isAvailable ? <Tooltip content={"Disponible"}><S.Active isWorker={row.original.isAdmin}><Icon name="Constructor" /></S.Active></Tooltip> : <Tooltip content={"Indisponible"}><S.Deactive><Icon name="Bed" /></S.Deactive></Tooltip>,
                // @ts-ignore
                sortType: (rowA, rowB, columnId, desc) => {
                    if (rowA.values.isAvailable && !rowB.values.isAvailable) return 1;
                    if (!rowA.values.isAvailable && rowB.values.isAvailable) return -1;
                    return 0;
                },
            },
            {
                Header: 'Poste',
                accessor: 'isAdmin',
                id: 'job',
            },
            { Header: 'Prénom Nom', accessor: 'username', Cell: ({ row }) => <>{row.values.username}{auth.user.isAdmin && row.original.note && <Tooltip content={row.original.note}><Icon name={"Notes"} /></Tooltip>}</> },
            { Header: 'Numéro de téléphone', accessor: 'phone', Cell: ({ row }) => (auth.user.isAdmin || row.original.isAdmin) ? <S.CopyButton onClick={handleCopy(row.original.phone)}>{row.original.phone} <Icon name={"Copy"} /></S.CopyButton> : 'Caché' },
            { Header: 'Compte bancaire', accessor: 'bank', id: 'bank', Cell: ({ row }) => <S.CopyButton onClick={handleCopy(row.original.bank)}>{row.original.bank} <Icon name={"Copy"} /></S.CopyButton>},
            {
                Header: 'Badges',
                accessor: 'badges',
                filter: (rows, ids, filterValue) => {
                    if (filterValue === 'all') return rows;
                    if (filterValue === 'Without') {
                        return rows.filter((row) => !row.values.badges?.length);
                    }
                    return rows.filter((row) => row.values.badges?.find((badge: string) => badge === filterValue)) || [];
                },
                Cell: ({ row }) => (
                    <S.BadgesContainer>
                        {row.original.badges?.map((badgeId: string) => <Badge key={badgeId} badgeId={badgeId} user={row.original} />)}
                        {auth.user.isAdmin && <Button variant={"text"} size={"small"} icon={"Plus"} onClick={() => setAddBadge({ badgeId: '', userId: row.original.id })} />}
                    </S.BadgesContainer>
                ),
                maxWidth: 150,
                width: 10,
            },
            { Header: ' ', accessor: '', id: 'actions', Cell: ({ row }) => (
                    <S.TableActions>
                        <Tooltip content={!row.original.isAvailable ? "Rendre disponible" : "Rendre indisponible"}>
                            <Button icon={!row.original.isAvailable ? 'Constructor' : 'Bed'} variant={"outlined"} onClick={handleClickAction('available', row)} />
                        </Tooltip>
                        <Tooltip content={!row.original.isAdmin ? "Mettre admin" : "Retirer admin"}>
                            <Button icon={row.original.isAdmin ? 'ArrowDown' : 'ArrowUp'} variant={"outlined"} onClick={handleClickAction('admin', row)} />
                        </Tooltip>
                        <Tooltip content={"Ajouter/modifier une note"}>
                            <Button icon={"Edit"} variant={"outlined"} onClick={() => { setNoteModal(row.original.id); setNoteInput(row.original.note || '') }} />
                        </Tooltip>
                        <Tooltip content={"Supprimer le compte"}>
                            <Button icon={"TrashAlt"} variant={"outlined"} onClick={handleClickAction('delete', row)} />
                        </Tooltip>
                    </S.TableActions>
                )}
        ]
        , []);

    const hiddenColmuns = useMemo(() => {
        if (auth.user.isAdmin) {
            return ['job'];
        }
        return ['job', 'bank', 'actions'];
    }, [auth.user.isAdmin]);

    const tableInstance = useTable(
        {
            columns,
            data: tableData,
            initialState: {
                hiddenColumns: hiddenColmuns,
                filters: useMemo(
                    () => [
                        { id: 'badges', value: jobFilter },
                        { id: 'isAvailable', value: availableFilter }
                    ],
                    [availableFilter, jobFilter],
                ),
                sortBy: useMemo(
                    () => [
                        { id: 'isAvailable', desc: true },
                    ],
                    [],
                )
            }
        },
        useGlobalFilter,
        useFilters,
        useSortBy
    );

    const handleChangeSearch = (evt: React.ChangeEvent<HTMLInputElement>) => tableInstance.setGlobalFilter(evt.target.value);

    const handleClickFilter = (id: string, value: string) => () => {
        tableInstance.setFilter(id, value);

        if (id === 'job') setJobFilter(value);
        else if (id === 'isAvailable') setAvailableFilter(value);
    }

    const handleSelect = (evt: React.ChangeEvent<HTMLInputElement>) => {
        tableInstance.setFilter('badges', evt.target.value);
        setJobFilter(evt.target.value);
    }

    const handleAddBadge = () => {
        if (addBadge?.badgeId && addBadge.userId) {
            const user = users.users?.find(({ id }) => addBadge.userId === id);
            socket.emit('updateOtherUser', {
                id: addBadge.userId,
                newData: { badges: [...user.badges || [], addBadge.badgeId] },
            });
            setAddBadge(null);
        }
    }

    const handleNote = () => {
        socket.emit('updateOtherUser', {
            id: noteModal,
            newData: { note: noteInput },
        });
        setNoteModal(null);
    }

    const activeFilterValue = tableInstance.state.filters.find((filter: any) => filter.id === 'job')?.value || 'all';
    const availableFilterValue = tableInstance.state.filters.find((filter: any) => filter.id === 'isAvailable')?.value || 'all';

    return (
        <S.TableContainer>
            {modal && (
                <Dialog
                    title={dataModal[modal.context].title}
                    desc={dataModal[modal.context].desc}
                    cancelButtonProps={dataModal[modal.context].cancelButton}
                    successButtonProps={dataModal[modal.context].successButton}
                />
            )}
            {noteModal && (
                <Dialog
                    title={"Ecrire une note"}
                    cancelButtonProps={{ label: 'Annuler', onClick: () => setNoteModal(null) }}
                    successButtonProps={{ label: 'Enregistrer', onClick: handleNote }}
                >
                    <TextareaField onChange={(evt) => setNoteInput(evt.target.value)} value={noteInput} />
                </Dialog>
            )}
            {addBadge && (
                <Dialog
                    title="Attribuer un badge"
                    cancelButtonProps={{ label: 'Annuler', onClick: () => setAddBadge(null) }}
                    successButtonProps={{ label: 'Attribuer', onClick: handleAddBadge }}
                >
                    <Select onChange={(evt => setAddBadge((prevAdd) => ({ badgeId: evt.target.value, userId: prevAdd?.userId || '' })))} value={addBadge.badgeId} options={[{ label: 'Sélectionnez un badge', value: null }, ...badges.badges?.filter(badge => {
                        const user = users.users?.find(({ id }) => addBadge.userId === id);
                        return !user.badges?.includes(badge._id);
                    }).map(badge => ({ label: badge.label, value: badge._id })) || []]} />
                </Dialog>
            )}
            <S.TableHeader>
                <S.Filters>
                    <S.FilterSelect>
                        <Tooltip content={"Filtrer par badge"}>
                            {/* @ts-ignore */}
                            <Select onChange={handleSelect} value={jobFilter} options={[{ label: 'Tous', value: 'all' }, { label: 'Sans badge', value: 'Without' }, ...badges.badges.map((badge: any) => ({ label: badge.label, value: badge._id }))]} />
                        </Tooltip>
                    </S.FilterSelect>
                    <S.FilterButtons>
                        <Tooltip content={"Tous"}>
                            <S.FilterButton onClick={handleClickFilter('isAvailable', 'all')} isActive={availableFilterValue === 'all'}>
                                <Icon name="UsersAlt" />
                            </S.FilterButton>
                        </Tooltip>
                        <Tooltip content={"Disponibles"}>
                            <S.FilterButton onClick={handleClickFilter('isAvailable', 'available')} isActive={availableFilterValue === 'available'}>
                                <Icon name="Constructor" />
                            </S.FilterButton>
                        </Tooltip>
                        <Tooltip content={"Indisponibles"}>
                            <S.FilterButton onClick={handleClickFilter('isAvailable', 'notAvailable')} isLast isActive={availableFilterValue === 'notAvailable'}>
                                <Icon name="Bed" />
                            </S.FilterButton>
                        </Tooltip>
                    </S.FilterButtons>
                </S.Filters>
                <S.InputContainer>
                    <S.NumberOfUsers>{tableInstance.rows.filter(row => row.values.isAvailable).length}/{tableInstance.rows.length} disponible{tableInstance.rows.filter(row => row.values.isAvailable).length > 1 && 's'}</S.NumberOfUsers>
                    <InputField type={"text"} placeholder={"Recherche"} value={tableInstance.state.globalFilter} onChange={handleChangeSearch} />
                </S.InputContainer>
            </S.TableHeader>
            <S.TableContent>
                <Table tableInstance={tableInstance} />
            </S.TableContent>
        </S.TableContainer>
    )
};

export default UsersTable;
