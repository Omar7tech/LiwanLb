<?php

declare(strict_types=1);

namespace App\Policies;

use Illuminate\Foundation\Auth\User as AuthUser;
use App\Models\DesignDeliveryStandard;
use Illuminate\Auth\Access\HandlesAuthorization;

class DesignDeliveryStandardPolicy
{
    use HandlesAuthorization;
    
    public function viewAny(AuthUser $authUser): bool
    {
        return $authUser->can('ViewAny:DesignDeliveryStandard');
    }

    public function view(AuthUser $authUser, DesignDeliveryStandard $designDeliveryStandard): bool
    {
        return $authUser->can('View:DesignDeliveryStandard');
    }

    public function create(AuthUser $authUser): bool
    {
        return $authUser->can('Create:DesignDeliveryStandard');
    }

    public function update(AuthUser $authUser, DesignDeliveryStandard $designDeliveryStandard): bool
    {
        return $authUser->can('Update:DesignDeliveryStandard');
    }

    public function delete(AuthUser $authUser, DesignDeliveryStandard $designDeliveryStandard): bool
    {
        return $authUser->can('Delete:DesignDeliveryStandard');
    }

    public function restore(AuthUser $authUser, DesignDeliveryStandard $designDeliveryStandard): bool
    {
        return $authUser->can('Restore:DesignDeliveryStandard');
    }

    public function forceDelete(AuthUser $authUser, DesignDeliveryStandard $designDeliveryStandard): bool
    {
        return $authUser->can('ForceDelete:DesignDeliveryStandard');
    }

    public function forceDeleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('ForceDeleteAny:DesignDeliveryStandard');
    }

    public function restoreAny(AuthUser $authUser): bool
    {
        return $authUser->can('RestoreAny:DesignDeliveryStandard');
    }

    public function replicate(AuthUser $authUser, DesignDeliveryStandard $designDeliveryStandard): bool
    {
        return $authUser->can('Replicate:DesignDeliveryStandard');
    }

    public function reorder(AuthUser $authUser): bool
    {
        return $authUser->can('Reorder:DesignDeliveryStandard');
    }

}