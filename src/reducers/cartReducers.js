import { CART_ADD_ITEMS, CART_REMOVE_ITEMS, CART_SAVE_SHIPPING_ADDRESS, CART_SAVING_PAYMENT_METHOD } from "../constants/cartConstants";

export const cartReducers= (state ={cartItems:[],shippingAddress:{}},action)=>{
    switch(action.type){
        case CART_ADD_ITEMS:
            const item=action.payload

            const existItem=state.cartItems.find(x => x.product===item.product)
            if(existItem){
                return {
                    ...state,
                    cartItems:state.cartItems.map(x=>x.product===existItem
                        .product ? item : x)
                }
            }else{
                return {...state,
                        cartItems:[...state.cartItems, item]}
            }
            case CART_REMOVE_ITEMS:
                return {
                    ...state,
                    cartItems:state.cartItems.filter(x =>x.product!=action.payload),
                }
            case CART_SAVE_SHIPPING_ADDRESS:
                return {...state,
                    shippingAddress:action.payload,
                }
            case CART_SAVING_PAYMENT_METHOD:
                return {
                    ...state,
                    paymentMethod:action.payload,
                    
                }
        default:
            return state
    }
}

