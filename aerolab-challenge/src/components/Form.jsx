import { FormControl, InputLabel, Select, MenuItem } from  '@mui/material'
import useProducts from '../hooks/useProducts';

 const CATEGORIES = [
    { value: 'all', label: 'All' },
    { value: 'Audio', label: 'Audio' },
    { value: 'Cameras', label: 'Cameras' },
    { value: 'Phones', label: 'Phones' },
    { value: 'Laptops', label: 'Laptops' },
    { value: 'Smart Home', label: 'Smart Home' },
    { value: 'Drones', label: 'Drones' },
 ]

const Form = () => {
    const { category, handleChangeCategory } = useProducts()
    
    return ( 
        <form>
            <FormControl sx={{ mt: 2, minWidth: 130, width: { xs: '100%', sm: 'auto', }, fontSize: { xs: '0.8rem', sm: '1rem' },}} >
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                 labelId="category-label"
                label="Category"
                onChange={handleChangeCategory}
                value={category}
                >
                {
                    CATEGORIES.map( (cat) => (
                        <MenuItem key={cat.value} value={cat.value} >
                            {cat.label}
                        </MenuItem>
                    ))
                }
                </Select>
            </FormControl>
        </form>
     );
}
 
export default Form;