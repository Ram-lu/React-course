import "./App.css"

export const App = () => {
    return(
        <article className="tw-followCard">
            <header className="tw-followCard-header">
                <img 
                className="tw-followCard-avatar" 
                src="https://unavatar.io/x/warhammer" 
                alt="Avatar de warhammer" />

                <div className="tw-followCard-info">
                    <strong>
                        Warhammer Oficial
                    </strong>
                    
                    <span className="tw-followCard-account">
                        @warhammerOf
                    </span>
                </div>
            </header>

            <aside>
                <button className="tw-followCard-follow">
                    Seguir
                </button>
            </aside>
        </article>
    )
}

