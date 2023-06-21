import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Dancers.css';
interface Item {
    id: string;
    subtitle: string;
    title: string;
}

interface MyComponentProps {
    items: Item[];
}

const Dancers = () => {

    return (

        <div className='dancercontainer'>
            <div className="card">
                <h1 className="card-title">Megi Pojani</h1>
                <div className="card-image-dancer"></div>
            </div>

            <a href="https://mythrillfiction.com/" target="_blank">Mythrill</a></div>

    );
};
export default Dancers;