import React from 'react';
import { useNavigate } from 'react-router-dom';

// Navbarコンポーネントの定義
const Navbar = ({ currentPage }) => {
    // ページ遷移に使用するuseNavigateフックを呼び出し
    const navigate = useNavigate();

    // ページ遷移のハンドリング関数
    const handleNavigation = (page) => {
        // 指定されたページに遷移
        navigate(`/${page}`);
    };

    // 現在のページに基づいてボタンのスタイルを決定する関数
    const buttonStyle = (page) => {
        // 現在のページと一致する場合、背景色を変更
        return currentPage === page ? { backgroundColor: '#ccc' } : {};
    };

    // ナビゲーションバーのレンダリング
    return (
        <nav 
        //style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', backgroundColor: '#f0f0f0' }}
        >
            {/* ユーザーボタン */}
            <button
                onClick={() => navigate("/user")}
            >
                ユーザー
            </button>

            {/* ホームボタン */}
            <button
                onClick={() => navigate("/")}
            >
                ホーム
            </button>

            {/* ログボタン */}
            <button
                onClick={() => navigate('/log')}
            >
                ログ
            </button>
        </nav>
    );
};

export default Navbar;
