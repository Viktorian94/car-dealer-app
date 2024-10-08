'use client'

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Make {
  MakeId: number;
  MakeName: string;
}

export default function Home() {
  const [makes, setMakes] = useState<Make[]>([])
  const [selectedMake, setSelectedMake] = useState('')
  const [selectedYear, setSelectedYear] = useState('')

  useEffect(() => {
    fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
      .then(response => response.json())
      .then(data => setMakes(data.Results))
  }, []);

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 2014 }, (_, i) => (currentYear - i).toString())

  return (
    <div className="flex min-h-screen items-center bg-slate-300 lg:p-8 justify-center">
      <div className="flex items-center shadow-lg rounded-lg bg-white max-w-md p-6 justify-center w-full mx-auto">   
        <form className="space-y-4 w-full">
          <h1 className="text-3xl font-semibold text-center">Vehicle Filter</h1>
            <div>
              <label htmlFor="make" className="block mb-1">Vehicle make</label>
              <Select
                name="make"
                value={selectedMake}
                onValueChange={setSelectedMake}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder='Select vehicle'/>
                </SelectTrigger>
                <SelectContent>
                  {makes.map((make) => (
                    <SelectItem key={make.MakeId} value={make.MakeId.toString()}>
                      {make.MakeName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
                <label htmlFor="year">Model year</label>
                <Select
                  name="year"
                  value={selectedYear}
                  onValueChange={setSelectedYear}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder='Select year'/>
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>
            <Link href={selectedMake && selectedYear ? `/results/${selectedMake}/${selectedYear}` : '#'} passHref className="mt-2">
                <Button className='w-full rounded-md p-4' disabled={!selectedMake || !selectedYear}>Next</Button>
            </Link> 
        </form>
      </div>
    </div>
  );
}