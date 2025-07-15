import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useFavorites } from "../../shared/hooks/useFavorites";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import MapViewComponent from "./MapViewComponent";
import { localeOption } from "primereact/api";
import { Avatar } from "primereact/avatar";
const DataViewComponent = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const location = useLocation();
  const [totalRecords, setTotalRecords] = useState(0);
  const [lazyState, setLazyState] = useState({
    first: 0,
    rows: 10,
    page: 0
  });
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const [openMapModal,setOpenMapModal]=useState(false);
  const [target,setTarget]=useState(null);
  useEffect(() => {
    fetchEvents();
  }, [lazyState]);

  const columns = [
    { field: "name", header: 'Name' },
    { header: "Local StartDate", body: (e) => localStartDateTemplate(e) },
    { header: "Timezone", body: (e) => timeZoneTemplate(e) },
    { header: "Promoter Name", body: (e) => promoterNameTemplate(e) },
    {header:"Venue Details", body:(e)=>venueDetailsTemplate(e)}
  ]
  const venueDetailsTemplate=(e)=>{
    const points=[];
    e?._embedded?.venues?.forEach((venue)=>{
          points.push({lat:venue?.location?.latitude,lon:venue?.location?.longitude,label:venue?.name })
         })
         return <div className="px-2">
      {points.map((temp)=>{return <div className="flex align-items-center"><div className="pr-2">{temp.label}</div> <Button 
      icon="pi pi-map" text raised rounded onClick={()=>{setOpenMapModal(true);setTarget(temp);console.log(temp,"temp")}}/></div>})}</div>
  }
  const localStartDateTemplate = (e) => {
    return <>
      {e?.dates?.start?.localDate}
    </>
  }
  const timeZoneTemplate = (e) => {
    return <div className="px-2">
      {e?.dates?.timezone}
    </div>
  }
  const promoterNameTemplate = (e) => {
    return <div className="px-2">
      {e?.promoter?.name}</div>
  }
  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/events.json`,
        {
          params: {
            city: location?.state?.city,
            keyword: location?.state?.keyword,
            apikey: import.meta.env.VITE_TICKETMASTER_API_KEY,
            page: lazyState.page,
            size: lazyState.rows,
          },
        }
      );

      const newEvents = res.data._embedded?.events || [];

      setEvents((prev) => [...newEvents]);
      setTotalRecords(res.data.page.totalElements)
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };
  const onPage = (event) => {
    setLazyState(event);
    setFavoriteEvents([])
  };
  const renderHeader = () => (
    <div className="flex align-items-center justify-content-between">
      <div className="font-bold text-xl pl-5">{localeOption('EVENT_DETAILS')}</div>
      <div>
      <Button icon="pi pi-bookmark"
        rounded
        raised
        disabled={favoriteEvents.length>0?false:true}
        text
        className="mr-2"
        tooltip="Save Favourites" tooltipOptions={{ showDelay: 0, hideDelay: 300 ,position:'top'}}
        aria-label="Bookmark"
        onClick={() => { toggleFavorite(favoriteEvents); navigate('/profile') }}
      />
      
      <Avatar icon="pi pi-user" size="large" onClick={()=>navigate('/profile')}  style={{ backgroundColor: '#2196F3', color: '#ffffff' }} shape="circle" />
                
      </div>
     
    </div>
  );
  return <>
    <div className="card mx-5" style={{ overflow: 'auto', maxHeight: '85vh' }}>
      <DataTable
        value={events}
        selectionMode='checkbox'
        stripedRows
        selection={favoriteEvents}
        onSelectionChange={(e) => setFavoriteEvents(e.value)}
        dataKey="id"
        first={lazyState.first}
        rowsPerPageOptions={[10,20,50,100]}
        rows={lazyState.rows}
        onPage={onPage}
        totalRecords={totalRecords}
        paginator
        lazy
        showGridlines
        header={renderHeader}
        tableStyle={{ minWidth: '50rem' }}>

        <Column header="Favourite" selectionMode="multiple" headerStyle={{ width: '5rem' }}></Column>
        {columns.map((col, i) => (
          <Column field={col.field} header={col.header} body={col.body} bodyStyle={{padding:'0px',margin:'0px'}}></Column>
        ))}
      </DataTable>
      <Dialog
          visible={openMapModal}
          position="top"
          style={{width:'90vw',height:'90vh'}}
          onHide={()=>{
            if(!openMapModal) return;
            setOpenMapModal(false)}}

      >
      {target&&<MapViewComponent points={[target]}/>}
      </Dialog>
    </div>
  </>
}
export default DataViewComponent;