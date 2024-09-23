import { useAccounts } from 'hooks/accounts'
import { useClients } from 'hooks/clients'
import React from 'react'
import { getClientString } from 'utils'

const TransactionView = ({
  id,
  initiator_account,
  recipient_account,
  amount,
  memo
}) => {
  const {
    accountsData: initiatorAccounts,
    accountsLoading: initiatorLoading
  } = useAccounts(initiator_account)
  const {
    clientsData: initiatorClientData
  } = useClients(initiatorAccounts?.length &&
    initiatorAccounts[0].client_id)

  const {
    accountsData: recipientAccounts,
    accountsLoading: recipientLoading
  } = useAccounts(recipient_account)
  const {
    clientsData: recipientClientData
  } = useClients(recipientAccounts?.length &&
    recipientAccounts[0].client_id)

  return (
    <div className="d-flex flex-column text-start">
      <div className="p-1 text-secondary">
        id:
        <span className="text-black mx-1">{id}</span>
      </div>
      <div className="p-1 text-black">
        Initiator
      </div>
      <div className="p-1 mx-3 text-secondary">
        Account name:
        <span className="p-1 text-black">{initiator_account}</span>
      </div>
      {!initiatorLoading && initiatorAccounts?.length ? (
        <div className="mx-3 p-1 text-secondary">
          Account value:
          <span className="text-black mx-1">{initiatorAccounts[0].value}</span>
        </div>
      ) : null}
      {initiatorAccounts?.length && initiatorClientData?.length ? (
        <div className="mx-3 p-1 text-secondary">
          Account value:
          <span className="text-black mx-1">{getClientString(initiatorClientData[0])}</span>
        </div>
      ) : null}
      {!initiatorLoading && !initiatorAccounts?.length ? (
        <span className="mx-3 p-1">No data</span>
      ) : null}
      <div className="p-1 text-black">
        Recipient
      </div>
      <div className="p-1 mx-3 text-secondary">
        Account name:
        <span className="text-black mx-1">{recipient_account}</span>
      </div>

      {!recipientLoading && recipientAccounts?.length ? (
        <div className="mx-3 p-1 text-secondary">
          Account value:
          <span className="text-black mx-1">{recipientAccounts[0].value}</span>
        </div>
      ) : null}
      {recipientAccounts?.length && recipientClientData?.length ? (
        <div className="mx-3 p-1 text-secondary">
          Account value:
          <span className="text-black mx-1">{getClientString(recipientClientData[0])}</span>
        </div>
      ) : null}
      {!recipientLoading && !recipientAccounts?.length ? (
        <span className="mx-3 p-1">No data</span>
      ) : null}
      <div className="p-1 text-secondary">
        Amount:
        <span className="text-black mx-1">{amount}</span>
      </div>
      <div className="p-1 text-secondary">
        Memo:
        <span className="text-black mx-1">{memo}</span>
      </div>
    </div>
  )
}

export default TransactionView
