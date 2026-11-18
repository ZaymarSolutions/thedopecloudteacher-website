const $=x=>document.getElementById(x),course='cloud-fundamentals-101';
const base=location.origin+'/api';
const say=x=>$('message').textContent=x;
const stored=()=>sessionStorage.getItem('dct_sandbox_token');
async function call(route,body){
 const headers={};
 if(stored())headers.Authorization='Bearer '+stored();
 if(body)headers['Content-Type']='application/json';
 const r=await fetch(base+route,{method:body?'POST':'GET',headers,body:body?JSON.stringify(body):undefined,cache:'no-store'});
 const d=await r.json().catch(()=>({}));
 if(!r.ok)throw Error(d.error||'HTTP '+r.status);
 return d;
}
async function auth(mode){try{
 const data=await call('/auth/'+mode,{name:$('name').value.trim(),email:$('email').value.trim(),password:$('password').value});
 if(!data.token)throw Error('Login token missing');
 sessionStorage.setItem('dct_sandbox_token',data.token);
 $('password').value='';
 say('Sandbox account ready. Select test checkout.');
 }catch(e){say('Account error: '+e.message);}}
$('register').onclick=()=>auth('register');
$('login').onclick=()=>auth('login');
$('logout').onclick=()=>{sessionStorage.removeItem('dct_sandbox_token');say('Sandbox login cleared.');};
$('checkout').onclick=async()=>{try{
 if(!stored())throw Error('Create or sign in to your sandbox learner account first.');
 const data=await call('/create-checkout',{courseId:course});
 const url=new URL(data.url);
 if(url.origin!=='https://checkout.stripe.com')throw Error('Unexpected checkout destination');
 location.assign(url.href);
 }catch(e){say('Checkout error: '+e.message);}};
