import React from 'react';

const DashBoard: React.FC = () => {
    return (
        <React.Fragment>
            <div className="container" style={{ backgroundColor: 'lightblue' }}>
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text" style={{ textAlign: 'center' }}>Welcome to DCS Groups Of Hotels</h1>
                        <p className="text" style={{ textAlign: 'center' }}>We are ready to serve you</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default DashBoard;
