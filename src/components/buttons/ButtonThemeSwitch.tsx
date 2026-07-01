import React, { useEffect, useState } from 'react';

import ButtonToggle from './ButtonToggle';

const ButtonThemeSwitch = ({
    theme,
    onClick,
}: {
    theme: string;
    onClick: () => void;
}) => {
    const [isChecked, setIsChecked] = useState(false);
    useEffect(() => {
        if (theme === 'dark') {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [theme]);

    return <ButtonToggle isChecked={isChecked} onClick={onClick} />;
};

export default ButtonThemeSwitch;
