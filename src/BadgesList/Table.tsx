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

interface CreateBadgeState {
    open: boolean
    label: string,
    color: string,
}

interface RemoveBadgeState {
    userId: string,
    badgeId: string,
}


/**
 * Component
 */
const UsersTable = ({ data }: any) => {
    const auth = useAuth()
    const socket = useSocket();
    const badges = useBadges();
    const users = useUsers();

    const [createBadge, setCreateBadge] = useState(false);
    const [createBadgeLabel, setCreateBadgeLabel] = useState('');
    const [createBadgeColor, setCreateBadgeColor] = useState('');

    const [editBadge, setEditBadge] = useState<string | null>(null);
    const [editBadgeLabel, setEditBadgeLabel] = useState('');
    const [editBadgeColor, setEditBadgeColor] = useState('');

    const [deleteBadge, setDeleteBadge] = useState<string | null>(null);

    const tableData = useMemo(() => data, [data]);

    const handleDeleteBadge = () => {
        socket.emit('deleteBadge', {
            badgeId: deleteBadge,
        });
        setDeleteBadge(null);
    }

    const openEditBadge = (badgeId: string) => () => {
        setEditBadge((prevValue) => {
            const badge = badges.badges?.find((badge: { _id: string; }) => badge._id === badgeId);
            setEditBadgeLabel(badge.label);
            setEditBadgeColor(badge.color);
            return badge._id;
        });
    }

    const columns: Column<any>[] = useMemo(() => [
            {
                Header: 'id',
                accessor: '_id',
            },
            {
                Header: 'Nom',
                accessor: 'label',
            },
            {
                Header: 'Couleur',
                accessor: 'color',
                Cell: ({ value }: any) => (
                   <>
                       <S.BadgeChips color={value} />
                       {value}
                   </>
                ),
            },
            { Header: ' ', accessor: '', id: 'actions', Cell: ({ row }) => (
                    <S.TableActions>
                        <Tooltip content={"Modifier le badge"}>
                            <Button icon={"Edit"} variant={"outlined"} onClick={openEditBadge(row.original._id)} />
                        </Tooltip>
                        <Tooltip content={"Supprimer le badge"}>
                            <Button icon={"TrashAlt"} variant={"outlined"} onClick={() => setDeleteBadge(row.original._id)} />
                        </Tooltip>
                    </S.TableActions>
                )}
        ]
        , []);

    const tableInstance = useTable(
        {
            columns,
            data: tableData,
        },
        useGlobalFilter,
        useFilters,
        useSortBy
    );

    const handleCreateBadge = () => {
        socket.emit('createBadge', {
            label: createBadgeLabel,
            color: createBadgeColor,
        });

        setCreateBadge(false);
        setCreateBadgeLabel('');
        setCreateBadgeColor('');
    }

    const handleEditBadge = () => {
        socket.emit('editBadge', {
            badgeId: editBadge,
            data: {
                label: editBadgeLabel,
                color: editBadgeColor,
            },
        });
        setEditBadge(null);
    }

    return (
        <S.TableContainer>
            {createBadge && (
                <Dialog
                    title="Créer un badge"
                    cancelButtonProps={{ label: 'Annuler', onClick: () => setCreateBadge(false) }}
                    successButtonProps={{ label: 'Créer', onClick: handleCreateBadge }}
                >
                    <InputField placeholder="Employé LSMIC" type="text" onChange={(evt) => setCreateBadgeLabel(evt.target.value)} label="Nom" value={createBadgeLabel} />
                    <InputField type="color" onChange={(evt) => setCreateBadgeColor(evt.target.value)} label="Couleur" value={createBadgeColor} />
                </Dialog>
            )}
            {editBadge && (
                <Dialog
                    title="Modifier un badge"
                    cancelButtonProps={{ label: 'Annuler', onClick: () => setEditBadge(null) }}
                    successButtonProps={{ label: 'Modifier', onClick: handleEditBadge }}
                >
                    <InputField placeholder="Employé LSMIC" type="text" onChange={(evt) => setEditBadgeLabel(evt.target.value)} label="Nom" value={editBadgeLabel} />
                    <InputField type="color" onChange={(evt) => setEditBadgeColor(evt.target.value)} label="Couleur" value={editBadgeColor} />
                </Dialog>
            )}
            {deleteBadge && (
                <Dialog
                    title="Supprimer un badge"
                    desc="Êtes-vous sûr de vouloir supprimer ce badge ?"
                    cancelButtonProps={{ label: 'Annuler', onClick: () => setDeleteBadge(null)}}
                    successButtonProps={{ label: 'Supprimer', onClick: handleDeleteBadge }}
                 />
            )}
            <S.TableHeader>
                <S.Filters>
                    {auth.user.isAdmin && <Button onClick={() => setCreateBadge(true)}>Créer un badge</Button>}
                </S.Filters>
            </S.TableHeader>
            <S.TableContent>
                <Table tableInstance={tableInstance} />
            </S.TableContent>
        </S.TableContainer>
    )
};

export default UsersTable;
