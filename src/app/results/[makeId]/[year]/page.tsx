import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Suspense } from "react";


interface Vehicle {
    MakeId: number;
    Make_Name: string;
    Model_ID: number;
    Model_Name: string;
}

interface Make {
    MakeId: number;
    MakeName: string;
}

async function fetchVehicles(makeId: string, year: string): Promise<Vehicle[]> {
    try {
        const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`)
        if(!res.ok) {
            throw new Error(`err: ${res.status}`)
        }
        const data = await res.json();
        //console.log(data);
        return data.Results || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}
async function fetchMakes(): Promise<Make[]> {
    const res = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
    const data = await res.json()
    return data.Results
}

export async function generateStaticParams() {
    const makes = await fetchMakes();
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2014 }, (_, i) => (currentYear - i).toString())

    const topMakes = makes.slice(0, 10);
    const recentYears = years.slice(0, 5);

    const params = topMakes.flatMap(make =>  
        recentYears.map(year => ({
            makeId: make.MakeId.toString(),
            year, 
        }))
    )   
    return params
}   

function VehicleList({vehicles}: {vehicles: Vehicle[]}) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {vehicles.map(vehicle => (
                <Card key={vehicle.Model_ID} className="bg-white shadow-lg hover:shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-lg">{vehicle.Model_Name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">Make: {vehicle.Make_Name}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default async function ResultPage({ params }: { params: { makeId: string; year: string } }) {
    const vehicles = await fetchVehicles(params.makeId, params.year)

    return (
        <div className="min-h-screen p-8 bg-slate-300">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-center text-2xl">Vehicle result:</h1>
                <p className="text-center">
                    Results ID: {params.makeId} and year {params.year}
                </p>
                <Suspense fallback={ <div className="text-center">Loading...</div>}>
                    <VehicleList vehicles={vehicles}/>
                </Suspense>
                <div className="mt-8 text-center">
                    <Link href='/' className='text-blue-600 hover:text-blue-800'>
                        Back
                    </Link>
                </div>
            </div>
        </div>
    );
}