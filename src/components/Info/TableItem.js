import { useRemoveInfo } from 'hooks/info'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

const InfoTableItem = ({ item, refetch }) => {
  const {
    id,
    name,
    description,
    data
  } = item
  const [isEditing, setIsEditing] = useState(false)

  const deleteItemCallback = () => {
    Swal.fire('Deleted!', '', 'success');
    refetch()
  }

  const { removeLoading, remove } = useRemoveInfo(deleteItemCallback)

  const handleRemove = (id) => {
    Swal.fire({
      title: 'Do you want to remove item?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        remove(id)
      }
    });
  }

  return (
    <tr>
      <td>{id}</td>
      <td>
        {
          isEditing ?
            (<input type="text" className="form-control" value={name} />) :
            name
        }
      </td>
      <td>
        {
          isEditing ?
            (<input type="text" className="form-control" value={description} />) :
            description
        }
      </td>
      <td>
        {
          isEditing ?
            (<input type="text" className="form-control" value={data} />) :
            data
        }
      </td>
      <td>
        {
          isEditing ? (
            <button className="btn btn-success" onClick={() => setIsEditing(false)}>Save</button>
          ) : (
            <div className="d-flex justify-content-around">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                disabled={removeLoading}
                onClick={() => handleRemove(id)}
              >
                Remove
              </button>
            </div>
          )
        }
      </td>
    </tr >
  )
}

export default InfoTableItem
