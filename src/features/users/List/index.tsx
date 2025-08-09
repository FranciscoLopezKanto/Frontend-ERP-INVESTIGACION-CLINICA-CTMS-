import { useEffect, useState } from "react";
import { IUser } from "../../../api/users/types";
import { userService } from "../../../api/users";
import { Box, CircularProgress, Container, Paper } from "@mui/material";
import UsersTable from "./UsersTable";
import TableToolbar from "./TableToolbar";

export const ListUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [orden, setOrden] = useState('az');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users
    .filter((user) => {
      const searchLower = search.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.role.toLowerCase().includes(searchLower) 
      );
    })
    .sort((a, b) => {
      if (orden === 'az') return a.name.localeCompare(b.name);
      if (orden === 'za') return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <Container maxWidth="lg" sx={{ mt: 3, width: '110%' }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <TableToolbar
          title="Staff"
          subtitle="Visualiza el estado general de todo el Staff del centro. Haz clic en una fila para ver el detalle completo."
          search={search}
          onSearchChange={setSearch}
          orden={orden}
          onOrdenChange={setOrden}
        />
        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <UsersTable data={filteredUsers} />
        )}
      </Paper>
    </Container>
  );
};
