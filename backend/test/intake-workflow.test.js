'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {normalizeInquiry}=require('../intake-workflow');
const sample=()=>({
  submissionKey:'c0b2fd1a-1e29-4561-8f01-21ce2524bb55',
  name:'Example Learner',email:'person@example.org',category:'learner',
  message:'I would like to learn digital safety in a small group.',
  contactConsent:true,careerConsent:false
});
test('accepts valid learner inquiry without opting into career coaching',()=>{
  const r=normalizeInquiry(sample());
  assert.ok(r.data);
  assert.equal(r.data.careerConsent,false);
  assert.equal(r.data.email,'person@example.org');
});
test('accepts career coaching only with explicit learner consent',()=>{
  const r=normalizeInquiry({...sample(),careerConsent:true});
  assert.ok(r.data);
  assert.equal(r.data.careerConsent,true);
});
test('rejects coaching consent from partner intake',()=>{
  const r=normalizeInquiry({...sample(),category:'partner',careerConsent:true});
  assert.match(r.error,/learner/i);
});
test('requires opt-in contact response acknowledgement',()=>{
  assert.match(normalizeInquiry({...sample(),contactConsent:false}).error,/agree/i);
});
test('rejects weak email, message and invalid category',()=>{
  assert.ok(normalizeInquiry({...sample(),email:'not-an-email'}).error);
  assert.ok(normalizeInquiry({...sample(),message:'hello'}).error);
  assert.ok(normalizeInquiry({...sample(),category:'admin'}).error);
});
test('rejects missing idempotency key',()=>{
  assert.ok(normalizeInquiry({...sample(),submissionKey:''}).error);
});
test('traps bot submissions without writing personal data',()=>{
  const r=normalizeInquiry({...sample(),website:'spam.example.org'});
  assert.equal(r.honeypot,true);
  assert.equal(r.data,undefined);
});
test('normalizes whitespace, case and null optional fields',()=>{
  const r=normalizeInquiry({...sample(),name:'  Example  ',email:' Person@Example.org '});
  assert.equal(r.data.name,'Example');
  assert.equal(r.data.email,'person@example.org');
  assert.equal(r.data.organization,'');
});