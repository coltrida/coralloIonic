const helpers = () => {
    let base = '';
    if(window.location.host === 'localhost:8100'){
        //console.log('locale');
        base = 'http://statistichearkadia.test/api/';
    } else {
        //console.log('web');
        base = 'https://www.andirivieni.eu/api/';
    }
    return{
        linkvetture: base+'vetture',
    }
};

export default helpers;