(() => {
 const ends=Date.parse('2027-01-01T05:00:00Z');
 const active=Date.now()<ends;
 document.querySelectorAll('[data-year-end-offer]').forEach(el=>{el.hidden=!active;});
 if(!active)document.querySelectorAll('[data-offer-price]').forEach(el=>{el.textContent='See current enrollment options';});
})();
