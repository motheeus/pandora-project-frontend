export const verifyStatus = (id) => {
    switch(id){
        case 0: 
            return "Aguardando"
            break
        case 1: 
            return "Inativo"
            break
        case 2: 
            return "Em Venda"
            break
        case 3: 
            return "Vendido "
            break
        default:
            console.log("Erro!")
    }

}

export const verifyStatusColor = (id) => {
    switch(id){
        case 0: 
            return "#fae311"
            break
        case 1: 
            return "#afafaf"
            break
        case 2: 
            return "#00ad17"
            break
        case 3: 
            return "#b100cc"
            break
        default:
            console.log("Erro!")
    }

}