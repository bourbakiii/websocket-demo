import React from 'react';
import {ITrade} from "./Types.ts";
import {CSSTransition, TransitionGroup} from 'react-transition-group';

interface TableProps {
    trades: ITrade[];
}

const Table: React.FC<TableProps> = ({trades}) => {
    const renderTrades = () => {
        return trades.map((trade, index) => (
            <CSSTransition key={trade.id} timeout={500} classNames="fade">
                <tr>
                    <td>{trade && trade.id}</td>
                    <td>${trade && trade.price}</td>
                    <td>{trade && trade.quantity}</td>
                    <td>{trade && trade.buyerId}</td>
                    <td>{trade && trade.sellerId}</td>
                    <td>{trade && trade.time}</td>
                </tr>
            </CSSTransition>
        ));
    };
    if (!trades || !trades.length || !trades[0]) return <div>Loading...</div>;
    return (
        <div className="content__table">
            <table className="styled-table">
                <thead>
                <tr>
                    <th>Trade ID</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Buyer ID</th>
                    <th>Seller ID</th>
                    <th>Trade time</th>
                </tr>
                </thead>
                <TransitionGroup component="tbody">
                    {renderTrades()}
                </TransitionGroup>
            </table>
        </div>
    );
};

export default Table;
