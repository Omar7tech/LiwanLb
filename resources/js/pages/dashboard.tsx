import { logout } from '@/actions/App/Http/Controllers/AuthController';
import { Form } from '@inertiajs/react';

function dashboard() {
    return (
        <div>
            dashboard
            <Form type="submit" action={logout()} method="post">
                <button type="submit">logout</button>
            </Form>
        </div>
    );
}

export default dashboard;
