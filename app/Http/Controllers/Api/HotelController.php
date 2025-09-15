<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HotelController extends Controller
{
    public function index()
    {
        // retourner liste complète ou paginée
        return response()->json(Hotel::latest()->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string',
            'email' => 'nullable|email',
            'phone' => 'nullable|string|max:50',
            'price_per_night' => 'nullable|numeric',
            'currency' => 'nullable|string|max:10',
            'image' => 'nullable|image|max:4096',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('hotels','public');
            $data['image'] = $path;
        }

        $hotel = Hotel::create($data);
        return response()->json($hotel, 201);
    }

    public function show(Hotel $hotel)
    {
        return response()->json($hotel);
    }

    public function update(Request $request, Hotel $hotel)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string',
            'email' => 'nullable|email',
            'phone' => 'nullable|string|max:50',
            'price_per_night' => 'nullable|numeric',
            'currency' => 'nullable|string|max:10',
            'image' => 'nullable|image|max:4096',
        ]);

        if ($request->hasFile('image')) {
            // supprimer ancienne image si existante
            if ($hotel->image && Storage::disk('public')->exists($hotel->image)) {
                Storage::disk('public')->delete($hotel->image);
            }
            $path = $request->file('image')->store('hotels','public');
            $data['image'] = $path;
        }

        $hotel->update($data);
        return response()->json($hotel);
    }

    public function destroy(Hotel $hotel)
    {
        if ($hotel->image && Storage::disk('public')->exists($hotel->image)) {
            Storage::disk('public')->delete($hotel->image);
        }
        $hotel->delete();
        return response()->json(['message' => 'Supprimé'], 200);
    }
}
