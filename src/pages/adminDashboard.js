import { useEffect, useState } from 'react';
import { Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Header from '@/components/Header';
import AdminNavbar from '@/components/AdminNavbar';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [portfolioData, setPortfolioData] = useState([]);
  const [portfolioAmount, setPortfolioAmount] = useState(0);
  const [watchlistData, setWatchlistData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch('http://localhost:3001/api/admin/users', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error.message);
      });
  };

  const handleViewUser = (userId) => {
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`http://localhost:3001/api/admin/users/portfolio/${userId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPortfolioData(data.stocks);
        setPortfolioAmount(data.amount);
      })
      .catch((error) => {
        console.error('Error fetching portfolio data:', error.message);
      });

    fetch(`http://localhost:3001/api/admin/users/watchlist/${userId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWatchlistData(data.stocks);
      })
      .catch((error) => {
        console.error('Error fetching watchlist data:', error.message);
      });

    setOpenModal(true);
    setSelectedUser(userId);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
    setPortfolioData([]);
    setWatchlistData([]);
  };

  const handleDisableUser = (userId) => {
    const token = localStorage.getItem('token');
    const requestOptions = {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        },
    };

    fetch(`http://localhost:3001/api/admin/users/disable/${userId}`, requestOptions)
        .then((response) => {
        if (response.ok) {
            // User disabled successfully
            console.log('User disabled:', userId);
            // Update the state to reflect the disabled user
            setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user._id === userId ? { ...user, disabled: true } : user
            )
            );
        } else {
            // Error occurred while disabling user
            console.error('Error disabling user:', response.statusText);
        }
        })
        .catch((error) => {
        console.error('Error disabling user:', error.message);
        });
    };

    const handleEnableUser = (userId) => {
        const token = localStorage.getItem('token');
        const requestOptions = {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            },
        };

        fetch(`http://localhost:3001/api/admin/users/enable/${userId}`, requestOptions)
            .then((response) => {
            if (response.ok) {
                // User enabled successfully
                console.log('User enabled:', userId);
                // Update the state to reflect the enabled user
                setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === userId ? { ...user, disabled: false } : user
                )
                );
            } else {
                // Error occurred while enabling user
                console.error('Error enabling user:', response.statusText);
            }
            })
            .catch((error) => {
            console.error('Error enabling user:', error.message);
            });
    };

  return (
    <div>
      <Header hideHeader={true} />
      <AdminNavbar />
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>All Users</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleViewUser(user._id)}>View</Button> {" "}
                  {user.disabled ? (
                    <Button variant="outlined" onClick={() => handleEnableUser(user._id)}>Enable</Button>
                    ) : (
                    <Button variant="outlined" onClick={() => handleDisableUser(user._id)}>Disable</Button>
                    )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openModal} onClose={handleCloseModal} sx={{ backgroundColor: '#fff', padding: '20px', borderRadius: '4px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16)' }}>
        <div>
          <Typography variant="h6" gutterBottom>User Details</Typography>

          <Typography variant="subtitle1" gutterBottom>Portfolio:</Typography>
          {portfolioData ? (
            <>
                <Typography variant="subtitle2" gutterBottom>Amount: ${portfolioAmount}</Typography>
                <TableContainer>
                    <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell>Ticker</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Day Change</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {portfolioData.map((stock) => (
                        <TableRow key={stock._id}>
                            <TableCell>{stock.ticker}</TableCell>
                            <TableCell>{stock.name}</TableCell>
                            <TableCell>${stock.currentPrice}</TableCell>
                            <TableCell>{stock.day_change}%</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
            </>
          ) : (
                <Typography variant="subtitle2" gutterBottom>This user does not have a portfolio yet.</Typography>
          )}

          <Typography variant="subtitle1" gutterBottom>Watchlist:</Typography>
          {watchlistData ? (
            <TableContainer>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Ticker</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Day Change</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {watchlistData.map((stock) => (
                    <TableRow key={stock._id}>
                        <TableCell>{stock.ticker}</TableCell>
                        <TableCell>{stock.name}</TableCell>
                        <TableCell>${stock.price}</TableCell>
                        <TableCell>{stock.day_change}%</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
          ) : (
            <Typography variant="subtitle2" gutterBottom>This user does not have a watchlist yet.</Typography>
          )}
          
        </div>
      </Modal>
    </div>
  );
}
