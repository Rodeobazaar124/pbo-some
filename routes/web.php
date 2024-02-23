<?php

use App\Http\Controllers\PerangkatController;
use App\Http\Controllers\ProfileController;
use App\Models\ac;
use App\Models\lamp;
use App\Models\tv;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function () {
    return redirect(route('dashboard'));
});
Route::get('/dashboard', function () {
    $acData = Ac::where('user_id', auth()->user()->id)->get()->toArray();
    foreach ($acData as &$item) {
        $item['type'] = 'ac';
    }
    $tvData = Tv::where('user_id', auth()->user()->id)->get()->toArray();
    foreach ($tvData as &$item) {
        $item['type'] = 'tv';
    }
    $lampData = Lamp::where('user_id', auth()->user()->id)->get()->toArray();
    foreach ($lampData as &$item) {
        $item['type'] = 'lamp';
    }
    $gadget = array_merge($acData, $tvData, $lampData);
    return Inertia::render('Dashboard', [
        'gadget' => compact('gadget')
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('toggle', [PerangkatController::class, 'updateStatus'])->name('perangkat_toggle');
});

Route::resource('device', PerangkatController::class);
require __DIR__ . '/auth.php';
