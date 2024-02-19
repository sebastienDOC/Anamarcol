import './articles.css'
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/Menu';
import AllArticles from '../../components/Articles/AllArticles'

export default function Articles() {
    const uid = useContext(UidContext)

    return (
        <div>
            {uid ? (
                <div>
                    <Header />
                    <div className='articles-ctn'>
                        <Menu />
                        <AllArticles />
                    </div>
                </div>
            ) : 
                <div>
                    <h1>Veuillez vous connecter</h1>
                    <h2><Link to='/'>Retour à la page de connexion</Link></h2>
                </div>
            }
            
        </div>
    )
}