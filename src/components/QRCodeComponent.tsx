import React from 'react';
import QRCode from 'react-qr-code';

interface QRCodeProps {
    link: string;
}

const QRCodeComponent: React.FC<QRCodeProps> = ({link}) => {
    return (
        <div style={{textAlign: "center", margin: "20px"}}>
            <QRCode value={link} size={200}/>
        </div>
    );
};

export default QRCodeComponent;
