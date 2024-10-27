/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

export const TwitterFollowCard = ({usserName, name, isFollowing}) => {
    const text = isFollowing ? 'Siguiendo' : 'Seguir'
    const buttonClassName = isFollowing ? 'tw-followCard-follow is-following' : 'tw-followCard-follow'

  return (
        <article className="tw-followCard">
            <header className="tw-followCard-header">
                <img 
                className="tw-followCard-avatar" 
                src={`https://unavatar.io/x/${usserName}`}
                alt="Avatar de warhammer" />
            
                <div className="tw-followCard-info">
                    <strong>
                        {name}
                    </strong>
                    
                    <span className="tw-followCard-account">
                        @{usserName}
                    </span>
                </div>
            </header>

            <aside>
                <button className={buttonClassName}>
                    {text}
                </button>
            </aside>
        </article>
    )
}