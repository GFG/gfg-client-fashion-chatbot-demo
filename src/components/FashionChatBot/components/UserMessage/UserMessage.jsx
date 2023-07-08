import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './UserMessage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const cls = 'user-message-wrapper';
const messageCls = `${cls}__message`;
const avatarCls = `${cls}__avatar`;

export const UserMessage = ({ className, message }) => {
    return (
        <div className={classNames(cls, className)}>
            <div className={messageCls}>
                {message}
                <div className={`${messageCls}__arrow`} />
            </div>
            <div className={avatarCls}>
                <FontAwesomeIcon icon={faUser} className={`${avatarCls}__icon`} />
            </div>
        </div>
    );
};

UserMessage.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string
};
