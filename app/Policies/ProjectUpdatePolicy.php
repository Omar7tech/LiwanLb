<?php

declare(strict_types=1);

namespace App\Policies;

use Illuminate\Foundation\Auth\User as AuthUser;
use App\Models\ProjectUpdate;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProjectUpdatePolicy
{
    use HandlesAuthorization;
    
    public function viewAny(AuthUser $authUser): bool
    {
        return $authUser->can('ViewAny:ProjectUpdate');
    }

    public function view(AuthUser $authUser, ProjectUpdate $projectUpdate): bool
    {
        return $authUser->can('View:ProjectUpdate');
    }

    public function create(AuthUser $authUser): bool
    {
        return $authUser->can('Create:ProjectUpdate');
    }

    public function update(AuthUser $authUser, ProjectUpdate $projectUpdate): bool
    {
        return $authUser->can('Update:ProjectUpdate');
    }

    public function delete(AuthUser $authUser, ProjectUpdate $projectUpdate): bool
    {
        return $authUser->can('Delete:ProjectUpdate');
    }

    public function restore(AuthUser $authUser, ProjectUpdate $projectUpdate): bool
    {
        return $authUser->can('Restore:ProjectUpdate');
    }

    public function forceDelete(AuthUser $authUser, ProjectUpdate $projectUpdate): bool
    {
        return $authUser->can('ForceDelete:ProjectUpdate');
    }

    public function forceDeleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('ForceDeleteAny:ProjectUpdate');
    }

    public function restoreAny(AuthUser $authUser): bool
    {
        return $authUser->can('RestoreAny:ProjectUpdate');
    }

    public function replicate(AuthUser $authUser, ProjectUpdate $projectUpdate): bool
    {
        return $authUser->can('Replicate:ProjectUpdate');
    }

    public function reorder(AuthUser $authUser): bool
    {
        return $authUser->can('Reorder:ProjectUpdate');
    }

}