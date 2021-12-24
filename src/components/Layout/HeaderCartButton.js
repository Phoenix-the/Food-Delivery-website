import { useContext ,useEffect ,useState} from "react";

import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';
import CartContext from "../../store/cart-context";

const HeaderCartButton = props =>
{
    const [ btnIsHighLighted, setBtnIsHighLighted ] = useState( false );
    const cartCtx = useContext( CartContext );

    const { items } = cartCtx;

    const numberOfCartItems = items.reduce( ( curNumber, item ) =>
    {
        return curNumber + item.amount;
    }, 0 );

    const btnClasses = `${ classes.button } ${btnIsHighLighted ? classes.bump : ''}`;
    useEffect( () =>
    {
        if (items.length === 0 )
        {
            return;
            }
        setBtnIsHighLighted( true );

        const Timer = setTimeout( () =>
        {
            setBtnIsHighLighted( false );
        }, 300 );

        return () =>
        {
            clearTimeout( Timer );
        }
    },[items]);
    
    return (
        <button className={ btnClasses} onClick={ props.onClick }>
            <span className={ classes.icon }>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={ classes.badge }>{ numberOfCartItems }</span>
        </button>
    );
};

export default HeaderCartButton;