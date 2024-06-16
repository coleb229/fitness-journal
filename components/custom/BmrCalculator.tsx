'use client'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const BmrCalculator = () => {

  const [bmr, setBmr] = useState(0);
  const [age, setAge] = useState(0);
  const [feet, setFeet] = useState(0);
  const [inches, setInches] = useState(0);
  const [weight, setWeight] = useState(0);

  const calculateBmr = (age: number, feet: number, inches: number, weight: number) => {
    const bmr = 10 * weight + 6.25 * (feet * 12 + inches) - 5 * age + 5;
    return(bmr);
  }

  const handleSubmit = (event:any) => {
    event.preventDefault();
    setBmr(calculateBmr(age, feet, inches, weight));
  };

  return (
    <div className='bg-white px-6 py-2 rounded-lg shadow-lg'>
      <h1 className='font-bold text-right'>BMR: {bmr}</h1>
      <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
        <div>
          <Label>Age</Label>
          <Input name="age" type="number" onChange={(e) => setAge(parseInt(e.target.value))} />
        </div>
        <div>
          <Label>Feet</Label>
          <Input name="feet" type="number" onChange={(e) => setFeet(parseInt(e.target.value))} />
        </div>
        <div>
          <Label>Inches</Label>
          <Input name="inches" type="number" onChange={(e) => setInches(parseInt(e.target.value))} />
        </div>
        <div>
          <Label>Weight</Label>
          <Input name="weight" type="number" onChange={(e) => setWeight(parseInt(e.target.value))} />
        </div>
        <Button className="my-auto" type='submit'>
          Calculate
        </Button>
      </form>
    </div>
  )
}