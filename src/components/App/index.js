import React, { useContext } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom'
import { HOME, CLIENTS, INFO, TRANSACTIONS, LOGIN } from 'constants/routes'
import Accounts from 'pages/Accounts'
import LoginPage from 'pages/Login'
import ClientsPage from 'pages/Clients'
import InfoPage from 'pages/Info'
import TransactionsPage from 'pages/Transactions'
import { UserContext } from 'contexts/user'
import { useUser } from 'hooks/user'

function Router() {
  const { loading, data } = useContext(UserContext)

  if (!loading && data) return (
    <Routes>
      <Route exact path={HOME} element={<Accounts />} />
      <Route path={LOGIN} element={<LoginPage />} />
      <Route path={CLIENTS} element={<ClientsPage />} />
      <Route path={INFO} element={<InfoPage />} />
      <Route path={TRANSACTIONS} element={<TransactionsPage />} />
    </Routes>
  )
  if (loading && !data) return (<h1>Loading</h1>)
  if (!loading && !data) return (<LoginPage />)
}

function App() {
  const user = useUser()

  return (
    <UserContext.Provider
      value={user}
    >
      <HashRouter>
        <Router />
      </HashRouter>
    </UserContext.Provider>
  );
}

export default App
