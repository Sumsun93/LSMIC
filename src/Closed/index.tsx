/**
 * Package import
 */
import React, { useState, useEffect } from 'react';

/**
 * Local import
 */
import logo from '../logo.png';
import gif from './tenor.gif';

// style
import * as S from './style';

/**
 * Component
 */
const Closed = () => (
    <S.Container>
        <S.Logo src={logo} />
        <S.Form>
            <S.Title>C'est la fin.</S.Title>

            <S.Gif src={gif} />

            <S.Desc>
                Merci pour le travail fourni au sein des diverses missions et activités proposées par le LSMIC.
            </S.Desc>
            <S.Name>La famille Hawley.</S.Name>
        </S.Form>
    </S.Container>
)

export default Closed;
