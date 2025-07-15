import { locale, localeOption } from 'primereact/api';
import { InputSwitch } from 'primereact/inputswitch';
import { useEffect, useState } from 'react';
import { useFavorites } from '../shared/hooks/useFavorites';
import { Avatar } from 'primereact/avatar';
const AppTopbar = () => {
    const [checked, setChecked] = useState(true);
    const { layoutConfig } = useFavorites();
    useEffect(() => {
        if (checked) {
            document.body.dir = "ltr";
            layoutConfig({ locale: 'en' })
        }
        else {
            document.body.dir = "rtl"
            layoutConfig({ locale: 'ar' })
        }
    }, [checked]);

    return <>
        <div className='flex justify-content-between align-items-center'>
            <div className='font-bold text-xl ml-3'>
            <h2 className="m-0 text-primary font-bold">{localeOption('CITY_PULSE')}</h2>
            </div>
            <div className='flex'>
                <div className='flex align-items-center justify-content-center mx-2'>
                    <p>{checked ? "Arabic" : "English"}</p>
                    <InputSwitch className='mx-1' checked={checked} onChange={(e) => setChecked(e.value)} />
                    <p>{checked ? "English" : "Arabic"}</p>
                </div>
                
            </div>

        </div>

    </>
}
export default AppTopbar;