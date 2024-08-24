import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ currentPage }) => {

    const navigate = useNavigate();

    // 現在のページに基づいてボタンのスタイルを決定する関数
    const buttonStyle = (page) => {
        // 現在のページと一致する場合、背景色を変更
        return currentPage === page ? { backgroundColor: '#ccc' } : {};
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
