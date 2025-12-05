<?php

declare(strict_types=1);

namespace App\Policies;

use Illuminate\Foundation\Auth\User as AuthUser;
use App\Models\Residency;
use Illuminate\Auth\Access\HandlesAuthorization;

class ResidencyPolicy
{
    use HandlesAuthorization;
    
    public function viewAny(AuthUser $authUser): bool
    {
        return $authUser->can('ViewAny:Residency');
    }

    public function view(AuthUser $authUser, Residency $residency): bool
    {
        return $authUser->can('View:Residency');
    }

    public function create(AuthUser $authUser): bool
    {
        return $authUser->can('Create:Residency');
    }

    public function update(AuthUser $authUser, Residency $residency): bool
    {
        return $authUser->can('Update:Residency');
    }

    public function delete(AuthUser $authUser, Residency $residency): bool
    {
        return $authUser->can('Delete:Residency');
    }

    public function restore(AuthUser $authUser, Residency $residency): bool
    {
        return $authUser->can('Restore:Residency');
    }

    public function forceDelete(AuthUser $authUser, Residency $residency): bool
    {
        return $authUser->can('ForceDelete:Residency');
    }

    public function forceDeleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('ForceDeleteAny:Residency');
    }

    public function restoreAny(AuthUser $authUser): bool
    {
        return $authUser->can('RestoreAny:Residency');
    }

    public function replicate(AuthUser $authUser, Residency $residency): bool
    {
        return $authUser->can('Replicate:Residency');
    }

    public function reorder(AuthUser $authUser): bool
    {
        return $authUser->can('Reorder:Residency');
    }

}