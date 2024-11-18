import React from 'react';


const DashBoard: React.FC = () => {
    return (
        <React.Fragment>
            <div className="container" style={{ backgroundColor: '#D4A29C' }}>

                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text" style={{ textAlign: 'center' }}>Welcome to  Tic-tac-toe Game</h1>
                        <p className="text" style={{ textAlign: 'center' }}>Have a great day</p>
                       
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default DashBoard;
