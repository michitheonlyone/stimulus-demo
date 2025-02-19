<?php

namespace App\Twig\Components;

use App\Repository\PersonRepository;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\DefaultActionTrait;

#[AsLiveComponent]
final class PersonsOverviewComponent
{
    use DefaultActionTrait;

    public function __construct(private PersonRepository $personRepository) {}

    public function getPersons(): array
    {
        return $this->personRepository->findAll();
    }
}
