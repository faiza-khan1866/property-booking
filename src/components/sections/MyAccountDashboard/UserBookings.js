import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../http/API";
import { toast } from "react-toastify";
import { useTable, usePagination } from "react-table";

const ITEMS_PER_PAGE = 10; // Adjust the number of items per page as needed

const UserBookings = ({ xauthtoken, userId }) => {
  const [bookingList, setBookingList] = useState([]);
  const [bookingDate, setBookingDate] = useState(); // Set the booking date

  const handleCancellation = () => {
    const currentDate = new Date();
    const timeDifference = bookingDate?.getTime() - currentDate?.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference >= 5) {
      toast.success("Booking canceled successfully!");
    } else {
      toast.info("Cancellation not allowed. Minimum 5 days notice required.");
    }
  };

  useEffect(() => {
    let header = {
      headers: {
        Authorization: `Bearer ${xauthtoken}`,
      },
    };

    API.get(`/auth/bookings/${userId}`, header)
      .then((response) => {
        setBookingList(response?.data?.data);
      })
      .catch((err) => console.log(err));
  }, [xauthtoken, userId]);

  const data = useMemo(() => bookingList, [bookingList]);

  const columns = useMemo(
    () => [
      {
        Header: "Check-in Date",
        accessor: "check_in",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "Check-out Date",
        accessor: "check_out",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "No. of Guests",
        accessor: "no_of_guest",
      },
      {
        Header: "No. of Rooms",
        accessor: "no_of_rooms",
      },
      {
        Header: "Arrival Time",
        accessor: "estimated_arrival_time",
      },
      {
        Header: "Total",
        accessor: "amount",
        Cell: ({ value }) => `AED ${value}`,
      },
      {
        Header: "Payment Status",
        accessor: "payment_status",
        Cell: ({ value }) =>
          value === "SUCCESS" ? (
            <span className="badge badge-success">Payment Success</span>
          ) : value === "PENDING" ? (
            <span className="badge badge-warning">Payment Pending</span>
          ) : (
            <span className="badge badge-danger">Payment Canceled</span>
          ),
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <>
            <Link to={`/account/booking-details/${row.original.id}`}>
              <i className="far fa-eye" />
            </Link>
            <i
              className="far fa-ban ml-2 text-danger"
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleCancellation();
                setBookingDate(new Date(row.original.created_at));
              }}
            ></i>
          </>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageCount,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: ITEMS_PER_PAGE },
    },
    usePagination
  );

  return (
    <div className="myaccount-content">
      <h4 className="title">Bookings</h4>
      {bookingList?.length === 0 ? (
        <>
          <p>No Booking has been made yet.</p>
          <Link to={`/properties`} className="main-btn btn-filled mt-3">
            GO TO PROPERTIES
          </Link>
        </>
      ) : (
        <div className="table_page table-responsive">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageCount}
              </strong>{" "}
            </span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 20, 30, 40, 50].map((size) => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBookings;
