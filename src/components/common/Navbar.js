import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ currentPage }) => {

    const navigate = useNavigate();

    // ボタンの色を変更する関数
    const buttonStyle = (page) => {
        // 現在のページと一致する場合、背景色を変更
        return currentPage === page ? { backgroundColor: '#97D0BE' } : {};
    };

    return (
        <nav>
            {/* ユーザーボタン */}
            <button onClick={() => navigate("/user")} >
                ユーザー
            </button>

            {/* ホームボタン */}
            <button onClick={() => navigate("/")} >
                ホーム
            </button>

            {/* ログボタン */}
            <button onClick={() => navigate("/log")}>
                ログ
            </button>
        </nav>
    );
};

export default Navbar;
