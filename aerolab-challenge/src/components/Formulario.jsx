import { FormControl, InputLabel, Select, MenuItem } from  '@mui/material'
import useProductos from '../hooks/useProductos';


 const CATEGORIAS = [
    { value: 'Audio', label: 'Audio' },
    { value: 'Cameras', label: 'Camaras' },
    { value: 'Phones', label: 'Telefonos' },
    { value: 'Laptops', label: 'Laptops' },
    { value: 'Smart Home', label: 'Smart Home' },
    { value: 'Drones', label: 'Drones' },
 
 ]

const Formulario = () => {

    const { categoria, handleChangeCategoria } = useProductos()
    
    return ( 
        <form>
            <FormControl>
                <InputLabel>Categoria</InputLabel>
                <Select
                 label='Categoria'
                 onChange={handleChangeCategoria}
                 value={categoria}
                >

                {
                    CATEGORIAS.map( categoria => (
                        <MenuItem 
                        key={categoria.value} 
                        value={categoria.value}
                        >
                         {categoria.label}
                        </MenuItem>
                    ))
                }
                </Select>
            </FormControl>
        </form>
     );
}
 
export default Formulario;