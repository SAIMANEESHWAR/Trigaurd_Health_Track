import React from 'react'
import profile from '../../photos/profile1.png';
import { Link, Outlet, useNavigate } from "react-router-dom";


export default function DashboardNavbar() {
    return (
        <div>
            <section className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div className="container-fluid" style={{ width: "100%" }}>
                    < div className='d-flex flex-row mb-1'>
                        {/* <button className="btn btn-white ms-2 me-2 mt-3" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                    <i className="fa-solid fa-bars  h3  "></i></button> */}
                        <h1 className="mt-2">Block Busters</h1>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 navfont">

                            <li className="nav-item">
                                <div className="d-flex" role="search">
                                    {/* <button  onClick={regunit} ></button> */}
                                    <Link className="btn btn-outline-success me-1" to="/Dashboard/NestedUpload">Upload</Link>
                                    <Link className="btn btn-outline-success me-1" to="/Dashboard/NestedRetrieve">Retrieve</Link>                            </div>
                            </li>
                            <li className="nav-item">

                                <button type="button" className="btn " data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <div className="profilenavbar">
                                        <img src={profile} alt="" />
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <div>
                <Outlet></Outlet>

                {/* <!-- Modal --> */}
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                ...
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
