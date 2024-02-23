<?php

namespace App\Http\Controllers;

use App\Models\ac;
use App\Models\tv;
use App\Models\lamp;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class PerangkatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('device/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'type' => 'required',
        ]);
        $data['user_id'] = auth()->user()->id;
        $data['slug'] = Str::slug($data['name']);
        switch (strtolower($request->input('type'))) {
            case 'ac':
                unset($data['type']);
                return dd(AC::create($data));
                break;
            case 'tv':
                unset($data['type']);
                tv::create($data);
                break;
            case 'lamp':
                unset($data['type']);
                tv::create($data);
                break;
            default:
                unset($data['type']);
                return redirect(route('dashboard'))->with('errors', 'Gaada yh');
                break;
        }
        return redirect(route('dashboard'))->with('success', 'Perangkat berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render(
            'device/create',
            []
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        return $request;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $slug, Request $request)
    {
        $perangkat = [];
        switch (strtolower($request->input('type'))) {
            case 'ac':
                $perangkat = ac::where('slug', $slug);
                break;
            case 'tv':
                $perangkat = tv::where('slug', $slug);
                break;
            case 'lamp':
                $perangkat = lamp::where('slug', $slug);
                break;
            default:
                return redirect(route('dashboard'))->with('errors', 'Gaada yh');
                break;
        }
        $perangkat->delete();
        return redirect(route('dashboard'));
    }

    public function updateStatus(Request $request): RedirectResponse
    {
        $data = $request->json()->all();
        $perangkat = [];
        switch (strtolower($request->type)) {
            case 'ac':
                $perangkat = ac::where('slug', $data['slug']);
                break;
            case 'tv':
                $perangkat = tv::where('slug', $data['slug']);
                break;
            case 'lamp':
                $perangkat = lamp::where('slug', $data['slug']);
                break;

            default:
                return redirect(route('dashboard'))->with('errors', 'Gaada yh');
                break;
        }
        $perangkat->update(['status' => $data['status']]);
        return redirect(route('dashboard'));
    }
}
