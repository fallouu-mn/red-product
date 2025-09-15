<?php
namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\PasswordReset;


class PasswordController extends Controller
{
public function sendResetLink(Request $request)
{
$request->validate(['email' => 'required|email']);
$status = Password::sendResetLink($request->only('email'));
if ($status == Password::RESET_LINK_SENT) {
return response()->json(['message' => 'Lien de réinitialisation envoyé']);
}
return response()->json(['message' => __($status)], 500);
}


public function reset(Request $request)
{
$request->validate([
'token' => 'required',
'email' => 'required|email',
'password' => 'required|confirmed|min:8',
]);


$status = Password::reset(
$request->only('email', 'password', 'password_confirmation', 'token'),
function ($user, $password) {
$user->forceFill([
'password' => Hash::make($password)
])->setRememberToken(Str::random(60));


$user->save();


event(new PasswordReset($user));
}
);


if ($status == Password::PASSWORD_RESET) {
return response()->json(['message' => 'Mot de passe réinitialisé']);
}


return response()->json(['message' => __($status)], 500);
}
}